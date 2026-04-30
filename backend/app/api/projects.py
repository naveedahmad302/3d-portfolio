from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ProjectExplanation(BaseModel):
    project_id: int
    title: str
    explanation: str
    architecture_summary: str
    tech_insights: list[str]


EXPLANATIONS: dict[int, ProjectExplanation] = {
    1: ProjectExplanation(
        project_id=1,
        title="ASD Screening Platform",
        explanation="A cross-platform mobile application that leverages computer vision and speech analysis to screen for Autism Spectrum Disorder. The system captures biometric data through eye tracking (MediaPipe), speech pattern analysis (Librosa), and standardized questionnaires to generate comprehensive clinical risk assessments.",
        architecture_summary="React Native frontend communicates with a FastAPI backend. Firebase handles authentication and real-time data sync. ML models process biometric signals on the backend for accurate behavioral analysis.",
        tech_insights=[
            "MediaPipe provides real-time facial landmark detection for eye tracking",
            "Librosa extracts acoustic features like jitter, shimmer, and pitch patterns",
            "NativeWind enables utility-first styling in React Native",
            "FFmpeg handles audio format conversion for cross-platform compatibility",
        ],
    ),
    2: ProjectExplanation(
        project_id=2,
        title="Neural Code Engine",
        explanation="An intelligent development assistant that uses large language models to generate, analyze, and refactor code across multiple programming languages. Features context-aware suggestions and real-time collaboration capabilities.",
        architecture_summary="Next.js frontend with real-time editing. FastAPI backend orchestrates LLM calls through a pipeline architecture. PostgreSQL stores project context and Redis handles session caching.",
        tech_insights=[
            "Retrieval-Augmented Generation for codebase-aware suggestions",
            "Streaming responses for real-time code generation feedback",
            "Abstract Syntax Tree parsing for intelligent refactoring",
            "WebSocket connections for live collaboration sessions",
        ],
    ),
    3: ProjectExplanation(
        project_id=3,
        title="Quantum Dashboard",
        explanation="A high-performance real-time analytics platform that visualizes streaming data with interactive charts and provides predictive insights through embedded machine learning models.",
        architecture_summary="React frontend with D3.js visualizations. Node.js backend handles WebSocket data streams. MongoDB stores time-series data. TensorFlow.js runs client-side predictions.",
        tech_insights=[
            "WebSocket-based real-time data streaming architecture",
            "D3.js force-directed graphs for network visualization",
            "Client-side ML inference with TensorFlow.js",
            "Virtual scrolling for large dataset rendering",
        ],
    ),
    4: ProjectExplanation(
        project_id=4,
        title="CyberVault",
        explanation="A blockchain security suite that automates smart contract auditing, performs vulnerability scanning, and manages decentralized identities using zero-knowledge proofs.",
        architecture_summary="React frontend with GraphQL API layer. Smart contracts deployed on EVM-compatible chains. IPFS for decentralized storage. ZK-proof circuits for privacy-preserving verification.",
        tech_insights=[
            "Static analysis engine for Solidity vulnerability detection",
            "Zero-knowledge proof circuits using Circom/SnarkJS",
            "IPFS pinning for permanent decentralized data storage",
            "GraphQL subscriptions for real-time blockchain event monitoring",
        ],
    ),
}


@router.get("/projects/{project_id}/explain", response_model=ProjectExplanation)
async def explain_project(project_id: int):
    if project_id in EXPLANATIONS:
        return EXPLANATIONS[project_id]
    return ProjectExplanation(
        project_id=project_id,
        title="Unknown Project",
        explanation="Project not found.",
        architecture_summary="N/A",
        tech_insights=[],
    )
