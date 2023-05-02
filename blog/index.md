---
permalink: /blog/
layout: blog-index.html
override:tags:
title: Blog
---

<ol class="blog-listing">
{% for post in collections.blog | reverse %}{%- unless post.data.draft %}
  <li>
    {{ post.data.imageslug | picture }}
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <p class="excerpt">{{ post.data.excerpt }}</p>
    <div class="author-block">
      {%- for author in post.data.authors %}
      <a href="/tutorials/by-author/{{ author | slugify }}" class="avatar">
          <img src="/images/{{ author | slugify }}-avatar.jpg"
              alt="{{ author }} Avatar"
              loading="lazy"
              decoding="async"
              width="50"
              height="50">
      </a>
      {%- endfor %}
      {%- for author in post.data.authors %}
      <a href="/blog/by-author/{{ author | slugify }}">
        {{ author }}{% unless forloop.last %}, {% endunless %}
      </a>
      {%- endfor %}<br>
      <relative-time format="datetime" datetime="{{ post.date | iso8601 }}" year="numeric">
        {{ post.date | iso8601 }}
      </relative-time>
    </div>
  <aside class="mentions">
    <a href="{{ post.data.announcePost }}" class="reposts" aria-label="{{ post.data.reposts | size }} Boosts">
      {% icon "repeat" %}{{ post.data.reposts | size }}
    </a>
    <a href="{{ post.data.announcePost }}" class="likes" aria-label="{{ post.data.likes | size }} Likes">
      {% icon "heart" %}{{ post.data.likes | size }}
    </a>
  </aside>
  </li>
{% endunless %}{% endfor %}
</ol>
