from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactResponse(BaseModel):
    success: bool
    message: str


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(form: ContactForm):
    # In production: integrate with email service, store in DB, etc.
    return ContactResponse(
        success=True,
        message=f"Thank you {form.name}! Your message has been received.",
    )
