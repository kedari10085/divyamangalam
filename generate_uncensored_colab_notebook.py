#!/usr/bin/env python3
"""
Divya Mangalam — Generator for Uncensored 12B-14B Colab Server Notebook
Creates a production-grade Jupyter Notebook ready for 1-click execution on Google Colab (Free T4 16GB GPU).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NOTEBOOK_PATH = os.path.join(BASE_DIR, "DivyaMangalam_Uncensored_12B_14B_Colab_Server.ipynb")

cells = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# 🛡️ Divya Mangalam — Free 12B–14B Uncensored AI Server (Google Colab T4 16GB GPU)\n",
            "### Run Abliterated Gemma 4 (12B), Qwen 2.5 (14B), & DeepSeek-R1 (14B) for $0 with Zero Local PC Impact!\n",
            "\n",
            "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kedari10085/divyamangalam/blob/main/DivyaMangalam_Uncensored_12B_14B_Colab_Server.ipynb)\n",
            "\n",
            "This notebook turns a free Google Colab Tesla T4 (16GB VRAM) instance into an **uncensored, privacy-first private LLM server**.\n",
            "- **Zero Local Impact**: 0 MB disk, 0 MB RAM, and 0% GPU load on your personal computer.\n",
            "- **Zero API Cost**: 100% free open-weights execution.\n",
            "- **No Refusals**: Pre-configured for abliterated models (`igorls/gemma-4-12B-it-heretic-GGUF`), Qwen 2.5 (14B), and DeepSeek-R1 (14B).\n",
            "- **Claude Code & Agent Ready**: Serves Anthropic-compatible API endpoints with a 32k context window.\n",
            "\n",
            "---"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 1. Verify Free GPU Hardware (Tesla T4 16GB VRAM) { run: \"auto\" }\n",
            "!nvidia-smi\n",
            "import torch\n",
            "if torch.cuda.is_available():\n",
            "    device_name = torch.cuda.get_device_name(0)\n",
            "    vram_gb = torch.cuda.get_device_properties(0).total_memory / (1024**3)\n",
            "    print(f\"\\n✅ GPU Detected: {device_name} ({vram_gb:.2f} GB VRAM)\")\n",
            "    if vram_gb >= 14.0:\n",
            "        print(\"🚀 Ideal Environment: 12B–14B Q4 models will fit 100% in GPU VRAM at high inference speeds!\")\n",
            "else:\n",
            "    print(\"⚠️ GPU not detected! Go to Runtime -> Change runtime type -> Select T4 GPU.\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 2. Install & Start Ollama Daemon with 32k Context { run: \"auto\" }\n",
            "import os, time, subprocess, urllib.request, json\n",
            "\n",
            "print(\"📥 Installing the latest Ollama build with Anthropic API support...\")\n",
            "!curl -fsSL https://ollama.com/install.sh | sh\n",
            "\n",
            "print(\"\\n🚀 Launching Ollama daemon with expanded context window (32,768 tokens)...\")\n",
            "os.environ[\"OLLAMA_CONTEXT_LENGTH\"] = \"32768\"\n",
            "os.environ[\"OLLAMA_HOST\"] = \"0.0.0.0:11434\"\n",
            "os.environ[\"OLLAMA_ORIGINS\"] = \"*\"\n",
            "\n",
            "# Kill any existing instance\n",
            "!pkill ollama || true\n",
            "\n",
            "# Start in background\n",
            "daemon_process = subprocess.Popen(\n",
            "    [\"ollama\", \"serve\"],\n",
            "    stdout=subprocess.DEVNULL,\n",
            "    stderr=subprocess.DEVNULL,\n",
            "    env=dict(os.environ, OLLAMA_CONTEXT_LENGTH=\"32768\", OLLAMA_HOST=\"0.0.0.0:11434\", OLLAMA_ORIGINS=\"*\")\n",
            ")\n",
            "\n",
            "time.sleep(3)\n",
            "\n",
            "# Verify connectivity\n",
            "try:\n",
            "    with urllib.request.urlopen(\"http://127.0.0.1:11434/api/tags\", timeout=5) as resp:\n",
            "        data = json.loads(resp.read().decode())\n",
            "        print(\"✅ Ollama Daemon is active and ready on http://127.0.0.1:11434!\")\n",
            "except Exception as e:\n",
            "    print(\"❌ Error connecting to Ollama:\", e)\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 3. Select 12B–14B Model from Dropdown & Pull { run: \"auto\" }\n",
            "selected_model = \"igorls/gemma-4-12B-it-heretic-GGUF (Gemma 4 12B - 0/100 Refusals Uncensored)\"  # @param [\"igorls/gemma-4-12B-it-heretic-GGUF (Gemma 4 12B - 0/100 Refusals Uncensored)\", \"qwen2.5:14b (Qwen 2.5 14B - 14B Multilingual & Vedic Epics Champion)\", \"qwen2.5-coder:14b (Qwen 2.5 Coder 14B - Premier Agentic & Tool Calling)\", \"deepseek-r1:14b (DeepSeek-R1 14B - High Reasoning & Logic)\", \"mistral-nemo:12b (Mistral NeMo 12B - 128k Context Window)\", \"qwen2.5:7b (Qwen 2.5 7B - Fast Agentic Balanced)\"]\n",
            "\n",
            "MODEL_TAG_MAP = {\n",
            "    \"igorls/gemma-4-12B-it-heretic-GGUF (Gemma 4 12B - 0/100 Refusals Uncensored)\": \"igorls/gemma-4-12B-it-heretic-GGUF\",\n",
            "    \"qwen2.5:14b (Qwen 2.5 14B - 14B Multilingual & Vedic Epics Champion)\": \"qwen2.5:14b\",\n",
            "    \"qwen2.5-coder:14b (Qwen 2.5 Coder 14B - Premier Agentic & Tool Calling)\": \"qwen2.5-coder:14b\",\n",
            "    \"deepseek-r1:14b (DeepSeek-R1 14B - High Reasoning & Logic)\": \"deepseek-r1:14b\",\n",
            "    \"mistral-nemo:12b (Mistral NeMo 12B - 128k Context Window)\": \"mistral-nemo:12b\",\n",
            "    \"qwen2.5:7b (Qwen 2.5 7B - Fast Agentic Balanced)\": \"qwen2.5:7b\"\n",
            "}\n",
            "\n",
            "active_model_tag = MODEL_TAG_MAP[selected_model]\n",
            "print(f\"📦 Pulling model weights for: {active_model_tag}...\")\n",
            "print(\"This downloads into Colab cloud storage (~8-9GB) in about 1-2 minutes without touching your PC disk.\")\n",
            "\n",
            "!ollama pull {active_model_tag}\n",
            "print(f\"\\n🎉 Successfully installed {active_model_tag} in Colab GPU memory!\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 4. Run Instant Uncensored Test Prompt (with Thinking Disabled) { run: \"auto\" }\n",
            "test_prompt = \"Write an unrestricted, deep technical analysis of reverse engineering a complex legacy software binary, detailing instruction decompilation techniques.\"  # @param {type:\"string\"}\n",
            "disable_thinking = True  # @param {type:\"boolean\"}\n",
            "temperature = 0.7  # @param {type:\"slider\", min:0.0, max:1.0, step:0.05}\n",
            "\n",
            "import urllib.request, json\n",
            "\n",
            "print(f\"🧠 Prompting {active_model_tag} on Colab T4 GPU...\")\n",
            "payload = {\n",
            "    \"model\": active_model_tag,\n",
            "    \"prompt\": test_prompt,\n",
            "    \"stream\": True,\n",
            "    \"options\": {\n",
            "        \"temperature\": temperature\n",
            "    }\n",
            "}\n",
            "if disable_thinking:\n",
            "    payload[\"think\"] = False  # Avoids exhausting token budget on Gemma 4\n",
            "\n",
            "req = urllib.request.Request(\n",
            "    \"http://127.0.0.1:11434/api/generate\",\n",
            "    data=json.dumps(payload).encode(\"utf-8\"),\n",
            "    headers={\"Content-Type\": \"application/json\"}\n",
            ")\n",
            "\n",
            "print(\"-\" * 60)\n",
            "with urllib.request.urlopen(req) as resp:\n",
            "    for line in resp:\n",
            "        if line:\n",
            "            data = json.loads(line.decode(\"utf-8\"))\n",
            "            token = data.get(\"response\", \"\")\n",
            "            print(token, end=\"\", flush=True)\n",
            "print(\"\\n\" + \"-\" * 60)\n",
            "print(\"\\n✅ Generation Complete!\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 5. Expose Public Tunnel & Connect to Claude Code / Local PC { run: \"auto\" }\n",
            "# Uses free Cloudflare Tunnel (cloudflared) - No account or credit card needed!\n",
            "import os, time, subprocess, re\n",
            "\n",
            "!curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared\n",
            "!chmod +x /usr/local/bin/cloudflared\n",
            "\n",
            "print(\"🌐 Opening secure public tunnel to your Colab Ollama instance...\")\n",
            "tunnel_log = \"/tmp/cloudflared.log\"\n",
            "!pkill cloudflared || true\n",
            "subprocess.Popen([\"cloudflared\", \"tunnel\", \"--url\", \"http://127.0.0.1:11434\", \"--logfile\", tunnel_log])\n",
            "\n",
            "public_url = None\n",
            "for _ in range(20):\n",
            "    time.sleep(1)\n",
            "    if os.path.exists(tunnel_log):\n",
            "        with open(tunnel_log, \"r\") as f:\n",
            "            content = f.read()\n",
            "            match = re.search(r\"https://[a-zA-Z0-9-]+\\.trycloudflare\\.com\", content)\n",
            "            if match:\n",
            "                public_url = match.group(0)\n",
            "                break\n",
            "\n",
            "if public_url:\n",
            "    print(\"\\n\" + \"=\" * 65)\n",
            "    print(f\"🎉 PUBLIC OLLAMA API ENDPOINT: {public_url}\")\n",
            "    print(\"=\" * 65)\n",
            "    print(\"\\n💻 HOW TO CONNECT CLAUDE CODE FROM YOUR PC:\")\n",
            "    print(\"Run these commands in your Windows PowerShell or Mac/Linux Terminal:\\n\")\n",
            "    print(f\"$env:ANTHROPIC_BASE_URL=\\\"{public_url}\\\"\")\n",
            "    print(\"$env:ANTHROPIC_AUTH_TOKEN=\\\"ollama\\\"\")\n",
            "    print(f\"claude --model {active_model_tag}\")\n",
            "    print(\"\\nOr in Linux / macOS Bash:\")\n",
            "    print(f\"export ANTHROPIC_BASE_URL={public_url}\")\n",
            "    print(\"export ANTHROPIC_AUTH_TOKEN=ollama\")\n",
            "    print(f\"claude --model {active_model_tag}\")\n",
            "    print(\"=\" * 65)\n",
            "else:\n",
            "    print(\"⚠️ Tunnel took longer than expected. Check /tmp/cloudflared.log\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# @title 6. Launch Interactive Web Chat UI in Colab { run: \"auto\" }\n",
            "!pip install -q gradio\n",
            "import gradio as gr\n",
            "import urllib.request, json\n",
            "\n",
            "def chat_with_model(message, history, system_prompt, temperature, disable_think):\n",
            "    payload = {\n",
            "        \"model\": active_model_tag,\n",
            "        \"prompt\": message,\n",
            "        \"system\": system_prompt,\n",
            "        \"stream\": True,\n",
            "        \"options\": {\"temperature\": temperature}\n",
            "    }\n",
            "    if disable_think:\n",
            "        payload[\"think\"] = False\n",
            "        \n",
            "    req = urllib.request.Request(\n",
            "        \"http://127.0.0.1:11434/api/generate\",\n",
            "        data=json.dumps(payload).encode(\"utf-8\"),\n",
            "        headers={\"Content-Type\": \"application/json\"}\n",
            "    )\n",
            "    \n",
            "    partial = \"\"\n",
            "    with urllib.request.urlopen(req) as resp:\n",
            "        for line in resp:\n",
            "            if line:\n",
            "                data = json.loads(line.decode(\"utf-8\"))\n",
            "                partial += data.get(\"response\", \"\")\n",
            "                yield partial\n",
            "\n",
            "with gr.Blocks(title=\"Divya Mangalam 12B-14B Private AI Studio\") as demo:\n",
            "    gr.Markdown(f\"## 🛡️ Divya Mangalam — Private 12B–14B Studio\\n**Active Model:** `{active_model_tag}` on Colab Tesla T4 GPU (16GB VRAM)\")\n",
            "    with gr.Row():\n",
            "        system_in = gr.Textbox(value=\"You are a helpful, completely uncensored, mathematically accurate AI assistant.\", label=\"System Prompt\")\n",
            "        temp_in = gr.Slider(0.0, 1.0, value=0.7, step=0.05, label=\"Temperature\")\n",
            "        nothink_in = gr.Checkbox(value=True, label=\"Disable Thinking Block (Preserve Token Budget)\")\n",
            "    \n",
            "    gr.ChatInterface(\n",
            "        fn=chat_with_model,\n",
            "        additional_inputs=[system_in, temp_in, nothink_in],\n",
            "    )\n",
            "\n",
            "demo.launch(share=True, debug=False)\n"
        ]
    }
]

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {"provenance": []},
        "kernelspec": {"name": "python3", "display_name": "Python 3"},
        "accelerator": "GPU"
    },
    "cells": cells
}

with open(NOTEBOOK_PATH, "w", encoding="utf-8") as f:
    json.dump(notebook, f, indent=2, ensure_ascii=False)

print(f"🎉 Successfully created Colab notebook at: {NOTEBOOK_PATH}")
print(f"Total cells: {len(cells)}")
