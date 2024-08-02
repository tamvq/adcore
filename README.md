# Adcore University Course Management Application

This is a Full Stack Web Development project for managing a list of university courses. The application is built using Python (FastAPI) for the back-end and a Angular framework for the front-end.

## Features

- CRUD operations for university courses
- API integration
- Front-end dashboard UI

## Requirements

- Python 3+
- FastAPI

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/tamvq/adcore.git
    cd adcore
    ```

2. Set up the back-end:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Run the back-end server:
    ```bash
    uvicorn main:app --reload
    ```

4. Set up the front-end:
    ```bash
    cd ../frontend
    npm install
    ```

5. Run the front-end server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:4200` to access the front-end.
2. Use the interface to manage the list of university courses.

## API Documentation

API documentation can be found [here](https://api.adcore.tsohlacol.xyz/docs).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
