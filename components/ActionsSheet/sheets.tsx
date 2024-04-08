import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AudioPreviewActionsSheet from '@/components/ActionsSheet/AudioPreviewActionsSheet'
import { Resource } from '@/api/resource'

export const audioPreview = 'audio-preview'
registerSheet(audioPreview, AudioPreviewActionsSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
    interface Sheets {
        'audio-preview': SheetDefinition<{
            payload: {
                value: Resource;
            };
        }>;
    }
}

export {};
