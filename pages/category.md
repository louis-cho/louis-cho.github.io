---
layout: page
title: Categories
permalink: /categories/
---
<link rel="stylesheet" href="{{ '/assets/css/category-style.css' }}">

# Browse by Category

<ul class="category-list">
{% assign categories = site.categories | sort %}
{% for category in categories %}
  {% assign category_name = category[0] %}
  {% assign posts_in_category = category[1] %}
  <li class="category-section">
    <button class="category-toggle" onclick="toggleCategory('{{ category_name | slugify }}')">
      {{ category_name }} ({{ posts_in_category.size }})
    </button>
    <div id="{{ category_name | slugify }}" class="post-container hidden" data-category="{{ category_name | slugify }}">
      <ul class="post-list">
        {% for post in posts_in_category %}
          <li>
            {{ post.date | date: "%b %-d, %Y" }}: 
            <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
      <div class="pagination-controls"></div>
    </div>
  </li>
{% endfor %}
</ul>


<script src="{{ '/assets/js/category-pagination.js' }}"></script>