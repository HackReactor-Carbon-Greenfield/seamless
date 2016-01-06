# Seamless

> An implementation of the Seam Carving algorithm in JavaScript. Seam carving
   allows for smart resizing of images based on content. Instead of removing 
   block chunks from the boarders of the images, seams - 1 pixel wide paths - 
   are dynamically removed allowing for important content in the image to 
   remain. _Read more here_: https://en.wikipedia.org/wiki/Seam_carving.

## Team

  - __Product Owner__: Michael Kim
  - __Scrum Master__: Victor York
  - __Development Team Members__: Brian Kustra, Anthony Mullins

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Usage instructions:

1. Users can either drag and drop an image in the drop area or paste an image url.
2. Select the new resolution by either dragging the percentage sliders, or inputting values directly.
3. After the image has uploaded and a resolution has been selected, press `render`. Users will see the image being Seamed in real time.
4. The the newly seamed images can be saved by using the right-click context menu (or control + left-click).

## Requirements

- Node 0.12.x

## Development

### Installing Dependencies

- `cd` into root directory of the project.
- run `npm install`.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
