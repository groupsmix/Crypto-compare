from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import BlogPost
from app.services.blog_service import (
    create_ai_blog_post,
    get_all_blog_posts,
    get_blog_post_by_slug,
)
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/blog", tags=["blog"])


class BlogPostResponse(BaseModel):
    id: int
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    date: str
    read_time: int
    image: str
    tags: list[str]
    meta_description: str
    is_published: bool
    is_ai_generated: bool

    class Config:
        from_attributes = True


class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str = "Guides"
    author: str = "CryptoRanked"
    date: str = ""
    read_time: int = 5
    image: str = ""
    tags: list[str] = []
    meta_description: str = ""
    is_published: bool = True


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    read_time: Optional[int] = None
    image: Optional[str] = None
    tags: Optional[list[str]] = None
    meta_description: Optional[str] = None
    is_published: Optional[bool] = None


class GenerateBlogRequest(BaseModel):
    topic: str = ""


# --- Public Endpoints ---

@router.get("/posts", response_model=list[BlogPostResponse])
async def list_blog_posts(db: Session = Depends(get_db)):
    """Get all published blog posts."""
    posts = get_all_blog_posts(db, published_only=True)
    return posts


@router.get("/posts/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str, db: Session = Depends(get_db)):
    """Get a single blog post by slug."""
    post = get_blog_post_by_slug(db, slug)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


# --- Admin Endpoints ---

@router.get("/admin/posts", response_model=list[BlogPostResponse])
async def admin_list_posts(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: list all posts including unpublished."""
    return get_all_blog_posts(db, published_only=False)


@router.post("/admin/posts", response_model=BlogPostResponse)
async def admin_create_post(
    data: BlogPostCreate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: create a new blog post manually."""
    from datetime import datetime

    if not data.date:
        data.date = datetime.utcnow().strftime("%Y-%m-%d")

    post = BlogPost(
        slug=data.slug,
        title=data.title,
        excerpt=data.excerpt,
        content=data.content,
        category=data.category,
        author=data.author,
        date=data.date,
        read_time=data.read_time,
        image=data.image,
        tags=data.tags,
        meta_description=data.meta_description,
        is_published=data.is_published,
        is_ai_generated=False,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/admin/posts/{post_id}", response_model=BlogPostResponse)
async def admin_update_post(
    post_id: int,
    data: BlogPostUpdate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: update an existing blog post."""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(post, field, value)

    db.commit()
    db.refresh(post)
    return post


@router.delete("/admin/posts/{post_id}")
async def admin_delete_post(
    post_id: int,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: delete a blog post."""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}


@router.post("/admin/generate", response_model=BlogPostResponse)
async def admin_generate_post(
    request: GenerateBlogRequest,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: generate an AI blog post on demand."""
    try:
        post = await create_ai_blog_post(db, topic=request.topic)
        return post
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
