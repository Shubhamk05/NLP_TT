const API_BASE = '/api';

export async function analyzeText({ text, document_name }) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, document_name: document_name || 'Untitled Document' }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Analysis failed' }));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }
  return response.json();
}

export async function analyzeFile(file, documentName) {
  const formData = new FormData();
  formData.append('file', file);
  if (documentName) {
    formData.append('document_name', documentName);
  }
  const response = await fetch(`${API_BASE}/analyze-file`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'File analysis failed' }));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }
  return response.json();
}

export async function compareTexts({ text_a, name_a, text_b, name_b }) {
  const response = await fetch(`${API_BASE}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text_a,
      name_a: name_a || 'Document A',
      text_b,
      name_b: name_b || 'Document B',
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Comparison failed' }));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }
  return response.json();
}

export async function compareFiles({ file_a, text_a, name_a, file_b, text_b, name_b }) {
  const formData = new FormData();
  if (file_a) formData.append('file_a', file_a);
  if (text_a) formData.append('text_a', text_a);
  if (name_a) formData.append('name_a', name_a);

  if (file_b) formData.append('file_b', file_b);
  if (text_b) formData.append('text_b', text_b);
  if (name_b) formData.append('name_b', name_b);

  const response = await fetch(`${API_BASE}/compare-files`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'File comparison failed' }));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }
  return response.json();
}

export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('Backend offline');
  return response.json();
}

export async function getModelStatus() {
  const response = await fetch(`${API_BASE}/model/status`);
  if (!response.ok) throw new Error('Failed to retrieve model status');
  return response.json();
}

export async function getEvaluationReport() {
  const response = await fetch(`${API_BASE}/model/evaluation-report`);
  if (!response.ok) throw new Error('Failed to retrieve precision & accuracy report');
  return response.json();
}

export async function predictAuthor(text, documentName = 'Query Document') {
  const response = await fetch(`${API_BASE}/model/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, document_name: documentName }),
  });
  return response.json();
}

export async function trainModel() {
  const response = await fetch(`${API_BASE}/model/train`, {
    method: 'POST',
  });
  return response.json();
}
