# Outbreak Simulator

## Background

In light of the COVID-19 during the last 2 years and the many variants being discovered,
I wanted to create a simulator that mimicked the map created by Johns Hopkins University to record global cases.
This simulator may show that could have happened if countermeasures were done differently or if a future outbreak occurs within the United States.
The spread of infection will be based on flight data.

## Functionality and MVPs

With this outbreak simulator, users will be able to:
- Set the state in which the outbreak starts
- Set the infectiousness of the virus (via the R number)
- Set which states proceed with lockdown protocols
- Get statistics from each state by hovering over the map
In addition, this project will include:
- An About modal describing the background of this simulator
- A production README

## Wireframes
https://wireframe.cc/knOstJ

- Nav links include links to this project's Github repo, my LinkedIn and the About modal
- Legend indicates meaning of colors
- Dropdown input to set "Start State" on right
- Text input to set "R Number" on right
- Lockdown States include radio buttons to toggle each state and text input for percentage of population infection
- Start button under Lockdown States
- Pause button under Lockdown States

## Technologies, Libraries, APIs

This project will be implemented with the following technologies:
- d3 to render the chart
- Aviation Stack API for flight data
- Aviationapi for interpreting flight startpoints and destinations

## Implementation Timeline
NB:
- Friday Afternoon & Weekend: Setup project. Spend time to get used to d3. Create State and flight classes. Render the map.
- Monday: Implement the underlying logic of the states statistics. Render if time.
- Tuesday: Get logic to run and render correctly. Ensure proper user inputs.
- Wednesday: Focus on Styling. Do Bonuses if time.
- Thursday Morning: Deploy to GitHub pages. If time, rewrite this proposal as a production README.


## Bonus Features
Some possible updates include:
- Making this global
- Making a click functionality rather than a dropdown
- Being able to pause the simulation to better analyze the situation
- Adding a table on the side to moniter which state has most cases
- Animating the flights
