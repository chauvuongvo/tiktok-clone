# Tiktok Clone App

Link demo:

## Introduce

Project clone from Tiktok, with main pages: - Home Page - Following Page (when log in and log out) - Accept login with default account use info below.

Login with username or email:

- username: chauvuong223068@gmail.com
- password: chauvuongvo

Login with phone and code:

- username: 0389803622
- default code: 123456

(Note: You can click Send Code to get a new code and it instead of default code)

### Library is used in project

- ReactJS
- Call api with Axios
- Tippy and Tippy Headless
- Sass / Scss

#### Feature

- Log in / Log out with default account.
- Validate input login.
- Save info account into localStorage when log in and Remove it when log out.

- Posts are rendered as Tiktok:

  - Title (includes tag name and tag user) is handled to render in UI.
  - Posted day is handled depending on current date and created post date.
  - Only play video in viewport.
  - Create new control for video in a post.
  - Handle increase / decrease for new volume bar
  - Render 5 posts when scroll to bottom page

- Use hook useDebounce to search account from api.
- Use hook useElementOnScreen to play and pause video.
- Portal technical is used to render Modal into bodyElement or specifically element through id
- Simple responsive for devices
