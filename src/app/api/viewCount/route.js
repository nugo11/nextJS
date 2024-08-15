import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'filmebi_all',
            password: 'Leopardi.1234',
            database: 'filmebi_all',
        });

        const [result] = await connection.execute(
            'UPDATE movies SET view_count = view_count + 1 WHERE id = ?',
            [id]
        );

        await connection.end();

        if (result.affectedRows > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to update view count' });
        }
    } catch (error) {
        console.error('Error updating view count:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function GET() {
    return NextResponse.json({ success: false, error: 'Invalid request method' });
}
