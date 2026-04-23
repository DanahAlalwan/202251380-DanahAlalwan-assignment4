
# Technical Documentation

## Overview
This project is a personal portfolio web application built using HTML, CSS, and JavaScript. It combines responsive design, interactivity, API integration, local storage, and form validation into one complete final project.

## Main Components

### 1. HTML Structure
The website is divided into clear sections:
- Hero
- About
- Skills
- Projects
- GitHub Repositories
- Personalized Greeting
- Contact Form
- Footer

### 2. CSS Design
The CSS file handles:
- layout and spacing
- responsive design
- color variables for light and dark mode
- card styling
- buttons, forms, and modal styling
- mobile navigation behavior

### 3. JavaScript Functionality
The JavaScript file implements:
- theme toggle with `localStorage`
- mobile menu toggle
- typing animation
- scroll progress bar
- project filtering, sorting, and search
- project details modal
- GitHub API repository fetching
- visitor name saving and clearing using `localStorage`
- contact form validation

## Data Handling

### Local Storage
Local storage is used for:
- storing the selected theme
- storing the visitor’s saved name

### GitHub API
The GitHub API is used to fetch the latest public repositories from my GitHub account and display them dynamically on the page.

## Validation
The contact form validates:
- empty fields
- email format
- subject length
- message length

## Error Handling
The application handles errors by:
- showing messages if GitHub repositories cannot be loaded
- showing feedback if no projects match the search
- showing helpful validation messages for incorrect form input

## Responsive Design
The website is designed to work across:
- desktop devices
- tablets
- mobile phones

Responsive behavior is handled using CSS media queries and flexible grid layouts.

## Future Improvements
Possible future enhancements include:
- adding project images
- adding a real working backend for the contact form
- adding animations when sections enter the screen
- adding downloadable resume support
- expanding the projects section with more real applications