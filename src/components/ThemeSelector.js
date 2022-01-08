import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['tomato', 'purple', 'green']

export default function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark') //switching between light and dark modes
    }
    console.log(mode)

    return (
        <div className='theme-selector'>
            <div className="mode-toggle">
                <img
                    src={modeIcon}
                    onClick={toggleMode}
                    alt="dark/light toggle icon"
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }} /> {/* changing icon color on click */}
            </div>
            <div className='theme-buttons'>
                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{ background: color }} />
                ))}
            </div>
        </div>
    )
}
