import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DividerNodeRenderer } from '../render/DividerNodeRenderer';
import { RenderOptions } from '@/types/render';

export type CreateDividerZipOptions = RenderOptions & {
  name: string
};

export const createDividerZip = ({
  bleed,
  name,
  imageFormat,
  onCancel,
  onRender,
  beforeDone,
  mapRenderResponse = async f => f
}: CreateDividerZipOptions) => {
  const zip = new JSZip;

  const renderer = new DividerNodeRenderer({
    bleed,
    onCancel,
    imageFormat,
    async onDone() {
      const content = await zip.generateAsync({ 
        type: 'blob',
      });

      if (beforeDone) {
        await beforeDone();
      }

      const zipName = `${name}.zip`;
      saveAs(content, zipName);
    },
    async onRender(event) {
      const { data } = event;
      const { filename } = data;
      const contents = await mapRenderResponse(data.contents);

      zip.file(filename, contents, {
        binary: true,
      });

      if (onRender) {
        await onRender(event);
      }
    }
  });

  return renderer;
}