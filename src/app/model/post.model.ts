import { NewsCategoryModel } from './newsCategory.model';
import { IFeturedImage } from '../Interface/featured-image.interface';

export class PostModel {
    id: number = null;
    title: string = "";
    slug: string = "";
    content: string = "";
    published: boolean = false;
    category: string = '';
    categoryList: NewsCategoryModel[] = [];
    tags: string[] = [];
    featuredImage: IFeturedImage = {
        original: '',
        large: '',
        medium: '',
        small: ''
    };
    author: string = "";
    createDate: Date | string = '';
    publishedDate: Date | string = '';
    canonicalUrl: string = ''
}