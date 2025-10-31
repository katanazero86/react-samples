export async function GET(request: Request) {
    const params = new URL(request.url).searchParams
    console.log('GET /api/data', params.get('page'))
    await new Promise(resolve => setTimeout(resolve, 5000)) // 5초 delay

    return Response.json(
        {
            message: '5초 후 응답'
        },
        {
            status: 200
        }
    )
}