export type CreateProductRequest = {
    infoProduct: Record<string, any>
    files: FileInfoRequest[]
    avatar?: FileInfoRequest
}

export type FileInfoRequest = {
    name: string
    format: string
    dataBytes: number[]
}

export type UpdateProductRequest = {
    infoProduct: Record<string, any>
    listFieldDelete: string[]
    avatar?: FileInfoRequest
    files: FileInfoRequest[]
    listFileIdDeletes: number[]
}