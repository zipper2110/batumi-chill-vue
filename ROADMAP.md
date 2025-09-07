# Batumi Guide - Implementation Roadmap

This document outlines the development plan for the Batumi Guide application, divided into 10 iterations. 
The approach is to start with a small, working MVP and incrementally add features.

## Iteration 1: Project Setup & Basic Structure ✅ COMPLETED
- ✅ Initialize project
- ✅ Set up basic project structure (packages, configurations)
- ✅ Create a simple "Hello Batumi" landing page
- ✅ Russian language as primary

## Iteration 2: Core Data Model & Simple UI ✅ COMPLETED
- ✅ Create the Location entity with essential fields (name, description, category, visited flag, photos)
- ✅ Add seed data with 5-10 popular locations in Batumi
- ✅ Load all locations from a single json file
- ✅ Design and implement location card component
- ✅ Display basic information on cards (name, category, short description)
- ✅ Implement a basic list view that displays all locations
- ✅ Add a simple header with application title

## Iteration 3: Location Details & Visit Tracking ✅ COMPLETED
- ✅ Enhance location cards with more details
- ✅ Add support for multiple photos per location
- ✅ Add the ability to mark places as visited/not visited
- ✅ Implement persistent storage of visited status in LocalStorage
- ✅ Create a location detail view that shows when a card is clicked
- ✅ Add "back to list" navigation

## Iteration 4: Category Filtering ✅ COMPLETED
- ✅ Implement category filtering functionality
- ✅ Create a category filter component in the UI
- ✅ Add visual indicators for different categories
- ✅ Enhance the UI to show active filters
- ✅ Implement "show all/visited/not visited" toggle

## Iteration 5: Improved UI & UX 
- Enhance overall application styling
- Implement proper mobile-first responsive design
- Add loading indicators and proper error handling
- Add sorting options (by name, by category)

## Iteration 6: Map View - Basic Implementation 
- Create a basic map view showing Batumi
- Add simple markers for all locations
- Implement toggle between list and map views
- Connect markers to location data

## Iteration 8: Enhanced Map Features 
- Add popup information when markers are clicked
- Implement category filtering on the map
- Add color coding for markers based on category
- Implement the ability to filter visited/not visited places on the map

## Iteration 9: Location Details Enhancement 
- Implement opening hours display
- Add address and contact information
- Create a "coolness rating" feature (must-see, cool, just ok)
- Implement address display and linking to external maps

## Iteration 10: Final Features & Polish
- Implement user location detection (if browser permits) -better use a library
- Add "distance from current location" feature
- Sort locations by proximity
- Implement "get directions" functionality
- Add progress tracking (% of places visited)

## Future Enhancements (Post MVP)
- User accounts and personalization
- Ability to add custom places
- Offline support
- Customizable itineraries

---
This roadmap provides a structured approach to building the Batumi Guide application, starting with the most essential features and gradually adding more advanced functionality. Each iteration builds upon the previous one, ensuring that there's always a working version of the application.
