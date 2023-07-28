# Chauffoh

- Dalton Carl
- Diana Tran
- Ian McIntyre
- Josh Tobin
- Rosanna Wyatt

Chauffoh makes getting home easy. Cant' drive? No problem! Book a ride, sit back, relax, and leave the driving to us!

If you've driven somewhere and you find yourself in a position where you can't, or don't want to drive, one of our drivers will come to where you are and drive you home in your own vehicle. With the use of autonimous vehicles we eliminate the need to pay two drivers for this service, so we can affordably get you - and your car - where you need to go.

We'll get you home safe!

## Design

- [API designs](/docs/apis.md)
- [Data models](/docs/data-model.md)
- [GHI Wireframes](/docs/ghi.md)
- [Integrations](/docs/integrations.md)

## Intended market

Our target clientele is anyone who drives somewhere and can't, or doesn't want to drive home. People who have gone out and drank more than they planned to. People who went somewhere and stayed too late, and they're too tired to safely drive home. People who need to have a surgery but don't have anyone to drive them. We're solving a universal problem for people with cars. We are currently limited to cities zoned for autonimous vehicles.

## Functionality

- Visitors to the site are taken to a home page, where they can:
  - Read about Chauffoh and our services
  - As a user (customer):
    - Create an account
    - Sign in
  - As an employee:
    - Access employee portal where they can create an account and log in
- About page gives information about the creators of the app, including social media links

### Customers

- Once signed in, a user is taken to their dashboard where they can:
  - View their current ride if they have one including viewing the receipt
  - Cancel their current ride
  - Access their account information
  - Access and view thier ride history
  - Access the page to request a ride
- On the account information page, a user is able to:
  - Change their name
  - Change their email address
- On the ride history page, a user is able to:
  - View all past rides
  - Click "view" to go to a page with just the selected ride, where they can access the receipt
- On the request a ride page the user can:
  - Select whether the ride is round trip or not (round trip meaning we will pick up your car from somewhere, bring it home, then bring your car to you on a specified time and date)
  - Enter pertinent information for a ride
  - See ride estimate
  - Request a ride

### Employees

- Once signed in, an employee is taken to their dashboard where they can:
  - See a list of all rides that are currently in progress, with an option to complete them
  - See a list of open (unclaimed) rides, with an option to claim them
  - See a list of past completed rides
  - See a list of current employees
  - Access their account information
- On the account information page, a user is able to:
  - Change their name
  - Change their email address

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create postgres-data`
4. Run `docker compose build`
    - M1/M2 Macs, Run `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build`
5. Run `docker compose up`
6. Access the app's front end through localhost:3000
