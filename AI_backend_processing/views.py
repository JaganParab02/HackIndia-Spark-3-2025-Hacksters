from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .extract_text import extract_text_from_pdf, extract_text_from_docx, extract_text_from_pptx


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def extract_text_view(request):
    """API endpoint to extract text from uploaded PDF, DOCX, or PPTX files."""
    if "file" not in request.FILES:
        return Response({"error": "No file provided"}, status=400)

    file = request.FILES["file"]
    file_name = file.name.lower()

    if file_name.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file)
    elif file_name.endswith(".docx"):
        extracted_text = extract_text_from_docx(file)
    elif file_name.endswith(".pptx"):
        extracted_text = extract_text_from_pptx(file)
    else:
        return Response({"error": "Unsupported file type"}, status=400)

    return Response({"extracted_text": extracted_text})
