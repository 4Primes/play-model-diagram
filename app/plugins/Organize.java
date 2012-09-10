package plugins;

public class Organize {
	public static void CalculateCircularCoordinates()
    {
		int modelCount=ModelDiagramPlugin.models.size();
		for (int i = 0; i < modelCount; i++) 
		{
			  Model model = (Model)ModelDiagramPlugin.models.get(i);
			  model.rect.x=(int) (500 + Math.cos(((Math.PI * 2) / modelCount) * i) * 300);
              model.rect.y=(int) (500 + Math.sin(((Math.PI * 2) / modelCount) * i) * 300);
        }
    }
}
