---
permalink: /blog/
override:tags:
title: Blog
---

<ol class="blog-roll">
{% for post in collections.blog %}{%- unless post.data.draft %}
    <li>
        <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
        <p class="excerpt">{{ post.data.excerpt }}</p>
        <div class="author-block">
          {%- for author in post.data.authors %}
          <a href="/blog/by-author/{{ author | slugify }}" class="avatar">
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
          <relative-time format="datetime" datetime="{{ post.date | iso8601 }}">
            {{ post.date | iso8601 }}
          </relative-time>
        </div>
    </li>
{% endunless %}{% endfor %}
</ol>
