---
layout: page
title: Archive by Year
permalink: /posts/
---
<link rel="stylesheet" href="{{ '/assets/css/year-style.css' }}">

# Browse by Year

<ul class="year-list">
{% assign posts_by_year = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% assign sorted_years = posts_by_year | sort: "name" | reverse %}
{% for year in sorted_years %}
  <li class="year-section">
    <button class="year-toggle" onclick="toggleYear('{{ year.name }}')">
      {{ year.name }} ({{ year.items | size }})
    </button>
    <div id="{{ year.name }}" class="post-container hidden" data-year="{{ year.name }}">
      <ul class="post-list">
        {% for post in year.items %}
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

<script src="{{ '/assets/js/year-pagination.js' }}"></script>
