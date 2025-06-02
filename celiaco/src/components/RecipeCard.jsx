const RecipeCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-80 p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default RecipeCard;
