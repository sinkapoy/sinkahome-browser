import WritableSlider from './WritableSlider.vue';
import WriteableBinding from './WriteableBinding.vue';
import ReadableBinding from './ReadableBinding.vue';
import { IProperty, PropertyAccessMode, PropertyDataType } from '@sinkapoy/home-core';
import { IBindingInfo } from './IBindingInfo';
import WriteableBoolean from './WriteableBoolean.vue';

export const bindingLayouts = {
    writeable: WriteableBinding,
    writeableSlider: WritableSlider,
    writableBoolean: WriteableBoolean,
    readable: ReadableBinding,
};

export function getBindingTypeByProperty(prop: IProperty, bindingInfo: IBindingInfo): keyof (typeof bindingLayouts) {
    switch (prop.accessMode) {
        case PropertyAccessMode.rw:
        case PropertyAccessMode.rwn:
            switch (prop.dataType) {
                case PropertyDataType.float:
                case PropertyDataType.int:
                    if (bindingInfo.max !== undefined && bindingInfo.min !== undefined && bindingInfo.step !== undefined) {
                        return 'writeableSlider';
                    }
                    break;
                case PropertyDataType.boolean:
                    return 'writableBoolean';
            }
            return 'writeable';
    }

    return 'readable';
}