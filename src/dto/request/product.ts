export type CreateProductRequest = {
    infoProduct: Record<string, any>
    files: FileInfoRequest[]
}

export type FileInfoRequest = {
    name: string
    format: string
    dataBytes: number[]
}