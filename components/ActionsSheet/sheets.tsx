import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import AudioPreviewActionsSheet from "@/components/ActionsSheet/AudioPreviewActionsSheet";
import { Resource } from "@/api/resource";
import ResourceFilterOptionActionsSheet from "@/components/ActionsSheet/ResourceFilterOption";
import ImagePreviewActionsSheet from "@/components/ActionsSheet/ImagePreviewActionsSheet";

export const audioPreview = "audio-preview";
export const imagePreview = "image-preview";
export const videoPreview = "video-preview";
export const resourceFilter = "resource-filter";

registerSheet(audioPreview, AudioPreviewActionsSheet);
registerSheet(imagePreview, ImagePreviewActionsSheet);

registerSheet(resourceFilter, ResourceFilterOptionActionsSheet);

type ResourceFilter = {
  filterType: Array<"audio" | "image" | "video">;
  search: string | undefined;
  refresh: boolean;
};

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "audio-preview": SheetDefinition<{
      payload: {
        value: Resource;
      };
    }>;
    "image-preview": SheetDefinition<{
      payload: {
        value: Resource;
      };
    }>;
    "resource-filter": SheetDefinition<{
      payload: {
        value: ResourceFilter;
      };
      returnValue: {
        search?: string;
        filterType?: Array<"audio" | "image" | "video">;
        refresh?: boolean;
        sort?: {
          name?: boolean;
          date?: boolean;
          size?: boolean;
        };
      };
    }>;
  }
}

export {};
