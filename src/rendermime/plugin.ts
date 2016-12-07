// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterLabPlugin
} from '../application';

import {
  HTMLRenderer, LatexRenderer, ImageRenderer, TextRenderer,
  JavascriptRenderer, SVGRenderer, MarkdownRenderer, PDFRenderer
} from '../renderers';

import {
  defaultSanitizer
} from '../sanitizer';

import {
  IRenderMime, RenderMime
} from './';


/**
 * The default rendermime provider.
 */
export
const plugin: JupyterLabPlugin<IRenderMime> = {
  id: 'jupyter.services.rendermime',
  provides: IRenderMime,
  activate: (): IRenderMime => {
    let sanitizer = defaultSanitizer;
    const transformers = [
      new JavascriptRenderer(),
      new HTMLRenderer(),
      new MarkdownRenderer(),
      new LatexRenderer(),
      new SVGRenderer(),
      new ImageRenderer(),
      new PDFRenderer(),
      new TextRenderer()
    ];
    let renderers: RenderMime.MimeMap<RenderMime.IRenderer> = {};
    let order: string[] = [];
    for (let t of transformers) {
      for (let m of t.mimetypes) {
        renderers[m] = t;
        order.push(m);
      }
    }
    return new RenderMime({ renderers, order, sanitizer });
  }
};
