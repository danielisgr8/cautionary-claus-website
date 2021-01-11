export interface User {
  username: string,
  firstName: string,
  lastName: string,
  address: {
    line1: string,
    line2: string,
    city: string,
    usState: string,
    zip: string
  },
  notes?: {
    id: string,
    message: string
  }[],
  assignedUser?: string
}
