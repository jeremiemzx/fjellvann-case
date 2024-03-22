import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'heading_title',
      title: 'Heading Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'imagePlacement',
          title: 'Image Placement',
          type: 'string',
          options: {
            list: ['Left', 'Right'],
          },
        },
      ],
    }),
    defineField({
      name: 'custom_list',
      title: 'List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'listItem',
          title: 'List item',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'text',
              media: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'button1',
      title: 'Button 1',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: '#ffffff' },
          { title: 'Light Gray', value: '#E9E9E9' },
          { title: 'Yellow', value: '#FFD600' },
          { title: 'Black', value: '#000000' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
