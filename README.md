# Gesture Recognition System

## Overview
The Gesture Recognition System is a machine learning-based project that detects and classifies hand gestures in real time using a webcam. It utilizes Python, OpenCV, TensorFlow/Keras, and Convolutional Neural Networks (CNNs) to recognize gestures like **Fist**, **Palm**, **Thumbs Up**, **Thumbs Down**, and **Peace**.

## Features
- Real-time gesture recognition
- Custom dataset-based training
- Supports multiple gesture classes
- Easy-to-integrate backend

## Technologies Used
- Python
- OpenCV
- TensorFlow/Keras
- NumPy
- Matplotlib

## Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd GestureRecognitionSystem
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python main.py
   ```

## Usage
- Place your hand in front of the webcam.
- The system will classify the gesture in real time.
- Press `q` to exit the application.

## Project Structure
```
GestureRecognitionSystem/
│-- dataset/                # Custom gesture images
│-- models/                 # Saved trained models
│-- main.py                 # Main script for running recognition
│-- train.py                # Script for training the model
│-- requirements.txt        # Dependencies
│-- README.md               # Project documentation
```

## Future Enhancements
- Add more gestures
- Improve accuracy with more training data
- Build a web-based interface

## License
This project is licensed under the MIT License.
