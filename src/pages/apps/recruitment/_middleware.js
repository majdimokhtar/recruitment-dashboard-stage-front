import { NextResponse } from 'next/server'

const allowedParams = ['keyword', 'location', 'page', 'jobType', 'education', 'experience', 'salary']

export async function middleware(req) {
  const url = req.nextUrl

  // Check if the pathname is /apps/recruitment/jobs/
  if (url.pathname === '/apps/recruitment/jobs/') {
    let changed = false
    url.searchParams.forEach((params, key) => {
      if (!allowedParams.includes(key)) {
        url.searchParams.delete(key)
        changed = true
      }
    })
    if (changed) {
      return NextResponse.redirect(url)
    }
  }

  // If the pathname is not /apps/recruitment/jobs/, pass the request to the next middleware
  return NextResponse.next()
}
