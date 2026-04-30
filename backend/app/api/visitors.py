from datetime import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

router = APIRouter()


class VisitorStats(BaseModel):
    active_visitors: int
    total_visits: int
    last_visit: str


active_connections: list[WebSocket] = []
total_visits = 0


@router.get("/visitors/stats", response_model=VisitorStats)
async def get_visitor_stats():
    return VisitorStats(
        active_visitors=len(active_connections),
        total_visits=total_visits,
        last_visit=datetime.utcnow().isoformat(),
    )


@router.websocket("/ws/visitors")
async def visitor_websocket(websocket: WebSocket):
    global total_visits
    await websocket.accept()
    active_connections.append(websocket)
    total_visits += 1

    try:
        await websocket.send_json(
            {
                "type": "connected",
                "active_visitors": len(active_connections),
                "total_visits": total_visits,
            }
        )

        for conn in active_connections:
            if conn != websocket:
                try:
                    await conn.send_json(
                        {
                            "type": "visitor_update",
                            "active_visitors": len(active_connections),
                        }
                    )
                except Exception:
                    pass

        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        for conn in active_connections:
            try:
                await conn.send_json(
                    {
                        "type": "visitor_update",
                        "active_visitors": len(active_connections),
                    }
                )
            except Exception:
                pass
