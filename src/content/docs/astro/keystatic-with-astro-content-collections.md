---
title: Keystatic with Astro's Content Collections
description: Keystatic with Astro's Content Collections
---

## Keystatic with Astro's Content Collections

[Keystatic with Astro's Content Collections (YOUTUBE)](https://www.youtube.com/watch?v=6l2YWCyPsWk)


```js
// keystatic.config.tsx

export default config({
  storage,
  collections: {
    tags: collection({
      label: 'Tags',
      path: 'src/content/tags/*',
      slugField: 'name',
      format: {
        data: 'yaml',
        contentField: 'markdoc',
      },
      schema: {
        markdoc: fields.emptyDocument(),
        name: fields.slug({name: {label: 'Name'}}) // не точно
      }
    }),

    authors: collection({
      label: 'Authors',
      path: 'src/content/authors/*',
      slugField: 'name',
      format: {
        data: 'yaml',
        contentField: 'markdoc',
      },
      schema: {
        markdoc: fields.emptyDocument(),
        name: fields.slug({name: {label: 'Author name'}}),
        avatar: fields.image({
          label: 'Avatar',
          directory: '/src/images/avatars',
          publicPath: '/src/images/avatars/',
        })
      }
    }),
    blog: collection({
      label: 'Blog Posts',
      path: 'src/content/blog/*/',
      slugField: 'title',
      format: {
        data: 'yaml',
        contentField: '_content',
      },
      schema: {
        title: fields.slug({name: {label: 'Title'}}),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false
        }),
        publishedOn: fields.date({label: 'Published On'}),
        summary: fields.text({label: 'Summary', multiline: true}),
        authors: fields.array(
          fields.relationship({label: 'Author', collection: 'authors'}),
          {
            label: 'Authors',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
        tags: fields.array(
          fields.relationship({label: 'Tag', collection: 'tags'}),
          {
            label: 'Tags',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
        _content: fields.document({
          label: 'Content',
          links: true,
          images: {
            directory: 'src/content/blog/*/_images',
            publicPath: '/src/content/blog/_images/',
          },
          dividers: true,
          formatting: true,
          tables: true,
          componentBlocks: {
            imageWithCaption: component({
              label: 'Image with caption',
              schema: {
                src: fields.image({
                  label: 'Image',
                  directory: 'src/content/blog/_images',
                  publicPath: '/src/content/blog/_images/',
                }),
                alt: fields.text({label: 'Alt text'}),
                caption: fields.text({label: 'Caption', multiline: true}),
              },
              preview: () => null,
            }),
            videoGif: component({
              label: 'Looping video',
              schema: {
                src: fields.pathReference({
                  label: 'Path to video',
                  description: 'The path relative to the /public directory'
                }),
                caption: fields.text({label: 'Caption', multiline: true}),
              },
              preview: () => null,
            })
          }
        })
      }
    })
  }
})

```

```js
// tags.mdoc (tags collection)

---
name: Labs
---
```

```js
// ben-derham.mdoc (authors collection)

---
name: Ben Derham
avatar: '/scr/images/avatars/ben-derham/avatar.jpg'
twitterLink: benderham88
bio: ''
---
```

![keystatic-01](@assets/images/astro/keystatic-01.jpg)
![keystatic-02](@assets/images/astro/keystatic-02.jpg)
![keystatic-03](@assets/images/astro/keystatic-03.jpg)
![keystatic-04](@assets/images/astro/keystatic-04.jpg)
![keystatic-05](@assets/images/astro/keystatic-05.jpg)
![keystatic-06](@assets/images/astro/keystatic-06.jpg)
![keystatic-07](@assets/images/astro/keystatic-07.jpg)
![keystatic-08](@assets/images/astro/keystatic-08.jpg)
![keystatic-09](@assets/images/astro/keystatic-09.jpg)
![keystatic-10](@assets/images/astro/keystatic-10.jpg)
![keystatic-11](@assets/images/astro/keystatic-11.jpg)
![keystatic-12](@assets/images/astro/keystatic-12.jpg)
![keystatic-13](@assets/images/astro/keystatic-13.jpg)
![keystatic-14](@assets/images/astro/keystatic-14.jpg)
![keystatic-15](@assets/images/astro/keystatic-15.jpg)
![keystatic-16](@assets/images/astro/keystatic-16.jpg)
![keystatic-17](@assets/images/astro/keystatic-17.jpg)
![keystatic-18](@assets/images/astro/keystatic-18.jpg)
![keystatic-19](@assets/images/astro/keystatic-19.jpg)
![keystatic-20](@assets/images/astro/keystatic-20.jpg)
![keystatic-21](@assets/images/astro/keystatic-21.jpg)
![keystatic-22](@assets/images/astro/keystatic-22.jpg)
![keystatic-23](@assets/images/astro/keystatic-23.jpg)
![keystatic-24](@assets/images/astro/keystatic-24.jpg)
![keystatic-25](@assets/images/astro/keystatic-25.jpg)
![keystatic-26](@assets/images/astro/keystatic-26.jpg)
![keystatic-27](@assets/images/astro/keystatic-27.jpg)
![keystatic-28](@assets/images/astro/keystatic-28.jpg)
![keystatic-29](@assets/images/astro/keystatic-29.jpg)
![keystatic-30](@assets/images/astro/keystatic-30.jpg)
![keystatic-31](@assets/images/astro/keystatic-31.jpg)
![keystatic-32](@assets/images/astro/keystatic-32.jpg)
![keystatic-33](@assets/images/astro/keystatic-33.jpg)
![keystatic-34](@assets/images/astro/keystatic-34.jpg)
![keystatic-35](@assets/images/astro/keystatic-35.jpg)
![keystatic-36](@assets/images/astro/keystatic-36.jpg)
![keystatic-37](@assets/images/astro/keystatic-37.jpg)
![keystatic-38](@assets/images/astro/keystatic-38.jpg)
![keystatic-39](@assets/images/astro/keystatic-39.jpg)
![keystatic-40](@assets/images/astro/keystatic-40.jpg)
![keystatic-41](@assets/images/astro/keystatic-41.jpg)
![keystatic-42](@assets/images/astro/keystatic-42.jpg)

## Codebase Editing With Minimal Footprint — Keystatic in Production

