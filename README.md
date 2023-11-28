# Survey Sift Application

Welcome to our advanced Survey sift application! This MERN stack project comes with integrated payment functionalities, robust user management, and a feature-rich admin dashboard. Crafted for survey creation, voting, result analysis, and seamless user interaction.

## Features 🚀

1. **Homepage**

   - Hero Section: Overview banner with an explore button.
   - Featured Surveys Section: Displaying most voted surveys.
   - Latest Surveys Section: Featuring recently created surveys.
   - How It Works Section: Customizable section matching the theme.
   - Testimonials Section: Static testimonials with avatars.
   - FAQ Section: Meaningful frequently asked questions.

2. **Surveys Page (Public)**

   - Display all surveys with relevant information.
   - Filter surveys by title, category, and vote.

3. **Survey Details Page (Public)**

   - Detailed information about the survey.
   - Authorized users can vote.
   - Pro users can add comments.
   - Visual representation of survey results with charts.
   - Like or dislike a survey.
   - Report a survey for inappropriate content.

4. **Pricing Page (Public)**

   - Integrate a payment system for users to become pro users.
   - Pro user navigation link in the home page navbar.
   - User role changes to pro-user on successful payment.

5. **User Authentication 📤**
   - Email/password and social media authentication.
   - JWT tokens for client-side authentication.
   - Role-based access control with different permissions.

## Dashboard Features 📊

### Admin Dashboard

- **Manage Users:**
  - Change user roles to admin/surveyor.
  - Filter users based on pro-user, normal users, and surveyor roles.
- **Survey Management:**
  - Publish or unpublish survey status.
  - Provide feedback messages when unpublishing a survey.
- **Payment Tracking:**
  - View all payments of pro-user members.
  - Display survey responses with a table and charts.

### Surveyor Dashboard

- **Survey Creation:**
  - Create surveys with various question types.
  - Include title, description, options, like/dislike (initially set to 0), category, and timestamp.
- **Feedback Management:**
  - View feedback for individual surveys given by users.
  - View feedback messages for individual surveys given by the admin.
  - Survey responses displayed with a table and charts.

### User Dashboard

- **Survey Participation:**
  - Participate in surveys.
  - Like or dislike a survey.
  - Report a survey for inappropriate content.

### Pro User Dashboard

- Inherits all permissions of the User role.
- **Survey Commenting:**
  - Comment on a survey.

## Technology Stack 💻

- **Frontend:**

  - React.js
  - Tailwind CSS
  - React Router
  - React Icons

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose ODM)
  - JWT for authentication

## Live Site 🌐

[Link to Live Site](#)
