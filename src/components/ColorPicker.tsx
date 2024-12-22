import { Color } from '../types';

interface ColorPickerProps {
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
  disabled?: boolean;
}

export default function ColorPicker({ selectedColor, onColorSelect, disabled }: ColorPickerProps) {
  const colors: Color[] = ['green', 'red', 'yellow'];
  
  return (
    <div className="flex gap-4">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          disabled={disabled}
          className={`
            w-20 h-20 rounded-full transition-transform
            ${color === 'green' ? 'bg-green-500 hover:bg-green-600' : ''}
            ${color === 'red' ? 'bg-red-500 hover:bg-red-600' : ''}
            ${color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            ${selectedColor === color ? 'scale-110 ring-4 ring-blue-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
      ))}
    </div>
  );
}