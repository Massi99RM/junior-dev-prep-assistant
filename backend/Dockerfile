FROM python:3.11-slim

WORKDIR /app

# Copy the dependency file
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY backend ./backend

# Run the application as a non-root user
RUN useradd --create-home appuser
USER appuser

# Document the port
EXPOSE 8000

# Start uvicorn: module path, host, port
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]