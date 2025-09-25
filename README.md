# News Aggregator Web Application

A modern Angular application to fetch, view, and bookmark news articles from various categories. This project demonstrates Angular features like components, services, RxJS, routing, state management, and dark/light mode.

---

## Features

- **Fetch News Articles**: Display news by categories (Business, Technology, Sports, Health, etc.)  
- **Search**: Search articles in Home and Bookmarks pages  
- **Bookmarking**: Add/remove articles to bookmarks; data persisted using `localStorage`  
- **Responsive Design**: Works on desktops, tablets, and mobile devices  
- **Dark Mode / Light Mode**: Toggle themes using CSS variables  
- **Article Details**: View full content for each news article  
- **Mock Data**: Uses local JSON file; no live API required

---
## 🚀 Live Demo

Check it out here: [Live Site](https://deepa-news-aggregator-app.netlify.app/home)  

---

## Project Structure

```bash
src/
 ├─ app/
 │   ├─ features/
 │   │   ├─ home/
 │   │   ├─ bookmarks/
 │   │   ├─ article-details/
 │   ├─ core/services/
 │   │   ├─ news.service.ts
 │   │   ├─ bookmark.service.ts
 ├─ assets/
 │   └─ mock-news.json

```
---

## Tech Stack

- **Frontend:** Angular 15, TypeScript, HTML5, CSS3, SCSS  
- **UI Components:** Angular Material  
- **State Management:** RxJS, Services  
- **Routing:** Angular Router  
- **Persistence:** localStorage (for bookmarks)  
- **Build & Deployment:** Angular CLI, Netlify  
- **Other Features:** Dark/Light Mode with CSS variables, Responsive Design

---

## How to Use
1. Clone the repo:
   
```bash
   git clone https://github.com/subradeepa08/news-aggregator-web-app.git
```
---
## Future Improvements

- Pagination / infinite scrolling for articles
- Integrate live news API for real-time updates
- User authentication for personal bookmarks
- Push notifications for breaking news
