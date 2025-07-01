import { IBindingInfo } from './IBindingInfo';
import { IBindingLayout } from './IBingingLayout';

export interface IBindingProps {
    store: IBindingLayout;
    name: string;
    binding: IBindingInfo;
    isAlbum: boolean;
}