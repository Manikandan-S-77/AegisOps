from fastapi import APIRouter
from models.chat import ChatRequest, ChatResponse
from agents.supervisor import supervisor

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    answer = supervisor(
        session_id=request.session_id,
        question=request.message
    )

    return ChatResponse(
        response=answer
    )