export interface Product {
    id : string; 
    name: string;
    description: string;
    logo: string;
    dateRelease: Date;
    dateRevision: Date;
}
export interface ProductAPI {
    id : string; 
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}
export interface ProductDTO {
    data: Product[];
}

export class ProductAdapter {
    static adapt(item: any): Product {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            dateRelease: new Date(item.date_release),
            dateRevision: new Date(item.date_revision)
        }
    }
}
export class ProductAPIAdapter {
    static adapt(item: Product): ProductAPI {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            date_release: item.dateRelease.toISOString().split('T')[0],
            date_revision: item.dateRevision.toISOString().split('T')[0]
        }
    }
}
export class ProductDTOAdapter {
    static adapt(item: any): ProductDTO {
        return {
            data: item.data.map((product: any) => ProductAdapter.adapt(product))
        }
    }
}
