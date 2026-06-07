import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                console.log("Current session:", session)
                setUser(session?.user || null)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching session:", error)
            } finally {
                setLoading(false)
            }
        }
        getSession()
        
    }, [])

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

        
    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    } 
    return context
}

export default AuthContext
