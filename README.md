# Chatbot

A simple chatbot application that can handle reservations, respond to general queries, and more. Built using Python, NLTK, PyTorch, and Flask for the backend, and HTML, CSS, and JavaScript for the frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Natural Language Processing with NLTK
- Neural Network model built with PyTorch
- Flask backend for handling chat requests
- Interactive frontend with HTML, CSS, and JavaScript
- Handles both English and French languages
- Context-aware responses for reservation requests

## Installation

### Prerequisites

- Python 3.7+
- pip

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/AyoubTe/chatbot.git
    cd chatbot
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Download NLTK data:

    ```python
    import nltk
    nltk.download('punkt')
    ```

5. Train the model (if not already trained):

    ```bash
    python train.py
    ```

6. Run the Flask application:

    ```bash
    python app.py
    ```

### Frontend Setup

1. Navigate to the `static` folder:

    ```bash
    cd static
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the Flask server:

    ```bash
    python app.py
    ```

2. Open your browser and navigate to `http://127.0.0.1:5000/` to interact with the chatbot.

3. Use the chat interface to ask questions, make reservations, and more.

## Project Structure

```plaintext
chatbot/
│
├── static/
│   ├── chatbot-icon.svg
│   ├── main.css
│   └── script.js
│
├── templates/
│   └── base.html
│   └── index.html
├── app.py
├── model.py
├── nltk_utils.py
├── train.py
├── intents.json
├── data.pth
├── requirements.txt
└── README.md
