---
order: 1
title: Tutorials
---

These tutorials will guide you through the process of creating your own Web Components from scratch, covering a range of
topics including the different APIs available for creating Web Components, how to use them to build efficient and
maintainable components, and best practices for working with Web Components.

<ol class="tutorials-listing">
{%- for g in groups.tutorials %}
  {%- assign page = collections[g].first %}
  <li>
    <a href="{{ page.url }}">
      {%- if page.data.imageslug %}
      {{ page.data.imageslug | picture }}
      {%- endif %}
    </a>
    <h3><a href="{{ page.url }}">{{ g }}</a></h3>
    <p>{{ page.data.excerpt }}</p>
    <div class="author-block">
      {%- for author in page.data.authors %}
      <a href="/blog/by-author/{{ author | slugify }}" class="avatar">
          <img src="/images/{{ author | slugify }}-avatar.jpg"
              alt="{{ author }} Avatar"
              loading="lazy"
              decoding="async"
              width="50"
              height="50">
      </a>
      {%- endfor %}
      {%- for author in page.data.authors %}
      <a href="/tutorials/by-author/{{ author | slugify }}">
        {{ author }}{% unless forloop.last %}, {% endunless %}
      </a>
      {%- endfor %}<br>
    </div>
  </li>
{%- else %}
  <li>Collection empty</li>
{%- endfor %}
</ol>
