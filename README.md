This is a React application that displays a 3D globe with satellite data points that can be filtered and searched. The application uses the react-globe.gl library to display the globe and the Papaparse library to parse CSV data. The user can search for specific satellites using the search bar, and when a data point is hovered over, information about that point is displayed in a card.

# Getting Started

## Local Deployment

To get started with this application, first clone this repository to your local machine. Then, navigate to the project directory and run the following commands:

``` 
npm install
npm start
```

This will install the required dependencies and start the development server. The application should now be accessible at http://localhost:3000.

## AWS EC2 Deployment

1. Create an EC2 instance on AWS and configure it to your needs (e.g. select an appropriate AMI, instance type, and security group).
2. Connect to the instance via SSH.
3. Install Node.js and npm on the instance.
4. Clone the repository to the instance using git clone.
5. Navigate to the project directory and run npm install to install the required dependencies.
6. Run npm start to start the development server.
7. You can now access the application by entering the instance's public IP address into a web browser.

## Usage

Upon opening the application, the user will see a 3D globe with satellite data points plotted on it. The user can use the search bar on the left-hand side of the screen to search for a specific satellite by ID. When a satellite is selected, the globe will update to display only that satellite's data points.

When the user hovers over a data point, a card will appear on the left-hand side of the screen with information about that point, including its latitude, longitude, altitude, and the time at which the satellite was at that location.

The globe can be interacted with by clicking and dragging to rotate the view. Zooming can be done using the scroll wheel or by pinching on touch screens.

## File Structure

* src/App.js: The main component that renders the application.
* src/index.js: The entry point for the application.
* public/test_data.csv: A sample CSV file containing satellite data.
* public/images/*: A texture image for the 3D globe. A background image for the 3D globe.
* package.json: Configuration file for the project dependencies.

## Libraries Used

* react-globe.gl: A library for rendering 3D globes in React applications.
* Papaparse: A fast and powerful CSV parser that can handle large files.

## Future Improvements
There are several areas in which this application could be improved:

* The search functionality could be expanded to include more search criteria.
* Additional information could be displayed in the hover card, such as the satellite's velocity or direction of travel.
* The globe could be made interactive in more ways, such as allowing the user to select a specific point and zoom in on it.
* The application could be optimized for performance, particularly when handling large datasets.
