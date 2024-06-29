# Team Fantastic Four (now five!): Reconnect

## Introduction
<p>Having common interests can create empathy and understanding between co-workers. As companies go remote giving employees more freedom it can remove the a company’s culture by not giving the opportunity for co-workers to find common interests outside of work.</p>
<p>Our app helps to build that bridge. We want to repair those bonds of common interest but also bring a sense of company pride and gamification to it.
As companies take the step towards going fully remote, employees can lose the banter and kinship.  With our app you can share events with other employees and compete against other companies for points</p>

## Created by Team Intergalactic 🚀

Kayle Robson [@revyrob](https://github.com/revyrob)  
Aparna Dhara [@AD9-1](https://github.com/AD9-1)  
Angela Kwok [@angelatyk](https://www.github.com/angelatyk)  
Ainur Saduova [@NuraSad](https://github.com/NuraSad)  
Henry Bellman [@hheennrryyb](https://github.com/hheennrryyb)

## Hackathon Parameters

1) Each project must be deployed on Vercel and have a public demo available.
2) Each project must have a demo video. Feel free to get creative with this!
3) Each project must have a README file with details on how to run the app.

**Frontend:**

- Create a user and be associated with one of the selected companies within the dropdown list. You will be required to finished sections of your profile before you can proceed.
- Once your profile is created, you can join groups and events created by groups.
- The events can be help online or offline.
- Any user can create an event or a group.

**Database:**

- Supabase hosts all our tables.
- We used Supabase for Authorization.
- We query our backend tables from the frontend.

**What it can do**
Login page uses Supabase Authenticate

Profile Page
Their posts best liked to least
Their groups
Awards, dummy data, potential to work on in the future

Update your profile with the icon in the top right corner

SideBar Nav

Explore:
User Posts
Likes (affects the Leaderboard posts for a company, higher liked ones will go first that are from a company employee)
How the # is associated with the group

Groups
View all the groups
See what members are in the group
Read more about the group
Click on a group
	Within the group:
Join or unjoin a group
Checkout the events for the group in the calendar
Checkout events on the side buttons
	Pop-up shows info about the event
	Join event
	See who is in the event

Calendar
Shows all the logged in users events
Can hover over and it will show more

Leaderboard
All the companies who have remote employees participating in Reconnect
Big bubbles mean more points, little bubbles mean less

Leaderboard Single
Checkout the company, it’s info, maybe it is looking for more employees?
Top star holders
The posts from it’s employees that are highly liked to lowest

Create Post

Create Group


## Planning and Preparation Documentation

### 🖊️ Wireframe

<a href="https://www.figma.com/design/PgZEp7yG7BhuQN4TSNFEXs/Stack-Five-Hackathon?node-id=0-1&t=mL6aujEOKQQoTQbX-0" target="_blank">WireFrame</a>

### 📝 Trello board for tickets/tasks

<a href="https://trello.com/b/8vVBTjOh/stackfivehackathon" target="_blank">Ticket board</a>

## Deployed Site

<p>We deployed using Netlify and Heroku</p>
<p>Check it out 👉 <a href="https://reconnector.vercel.app/" target="_blank">HERE</a></p>

## ⚒️ Tech Stack
![Logo](https://skillicons.dev/icons?i=html,scss,materialui,vite,supabase,postgres)


## 👩‍💻 Local Installation : Frontend

To install and run locally, you may follow these steps:

1. To start using this app you first need to clone the repository: `git clone git@github.com:NuraSad/reconnector-frontend.git`

2. Then you will need to install all the required packages for the application. Run this command (if you're using npm): `npm i`

3. Run the frontend by the following command `npm run dev`

4. Create a .env file in the root folder and add the following to the file: `VITE_SUPABASE_URL` and `VITE_ANON_KEY` and `VITE_GOOGLE_API_KEY` in your local .env file.

## 🔨 Things to Work On

- Creating the awards section with the points (commented out code)
- Hooking up the Strava Component with the embed (commented out code)
- Lattitude and longitude are part of the site, they just need to be implemented into a map for the Event pop-ups that are physical events.
- Gaining points depending on the events you participate in (just by clicking the box), creating a post, and shareing your kms/hrs for an activity.
- You and your company would gain points from from your participation. You and your company could win different medals for participation.
- The user could see their raters and so the companies see their overall rating for employee involvement.