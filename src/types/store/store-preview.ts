export default interface StorePreview {
    id: string
    name: string
    avatarImageUrl: string
    user: {
        fullName: string
        email: string
    }
}