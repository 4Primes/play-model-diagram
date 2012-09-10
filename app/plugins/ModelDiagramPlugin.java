package plugins;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import play.Play;
import play.PlayPlugin;
import play.mvc.Router;

public class ModelDiagramPlugin extends PlayPlugin {


    public static final List<Object> models = new ArrayList<Object>();
    public static final List<Object> Associations=new ArrayList<Object>();

    @Override
    public void onRoutesLoaded() {

        Router.addRoute("GET", "/@models/?", "modeldiagram.ModelDiagram.index");
        super.onRoutesLoaded();
    }

    @Override
    public void onApplicationStart() {
    	int len=1;
        List<Class> entities = Play.classloader.getAnnotatedClasses(Entity.class);
        entities.addAll(Play.classloader.getAnnotatedClasses(MappedSuperclass.class));
        entities.add(play.db.jpa.Model.class);
        	for(int j=0; j<entities.size();  j++)
        	{
        		Class clazz=entities.get(j);
        	Field[] fields = clazz.getDeclaredFields();
            Model model = new Model(clazz.getSimpleName(),fields.length,len++);

            if(clazz.isAnnotationPresent(MappedSuperclass.class))
            	{
            	model.label="MappedSuperClass: "+model.label;
            	}
            for (int i=0; i<fields.length; i++) {
                model.addMember(fields[i].getName(), fields[i].getType(),i);
            }
            models.add(model);
        	} 	
        Organize.CalculateCircularCoordinates();
        
        
        
        
        for(int j=0; j<entities.size();  j++)
    	{
        	Class clazz=entities.get(j);
        	Field[] fields = clazz.getDeclaredFields();
            for (int i=0; i<fields.length; i++) {

            	Annotation[] annotations = fields[i].getDeclaredAnnotations();
                for (Annotation annotation : annotations) {
                    if (annotation.annotationType().equals(OneToMany.class)) {
                        Type genericType = fields[i].getGenericType();
                        if (genericType instanceof ParameterizedType) {
                        	String simpleName = ( (Class) ((ParameterizedType) genericType).getActualTypeArguments()[0]).getSimpleName();                       	
                        	Joint joint=new Joint(len++,j+1,seek(simpleName));
                        	joint.opt.attrs.stroke="blue";      
                            Associations.add(joint);
                        }
                    } 
                    else if (annotation.annotationType().equals(OneToOne.class)) {
                        String simpleName =  fields[i].getType().getSimpleName();
                        Joint joint=new Joint(len++,j+1,seek(simpleName));
                        joint.opt.attrs.stroke="green";
                    	Associations.add(joint);
                    }
                    else if (annotation.annotationType().equals(ManyToMany.class)) {                      
                        Type genericType = fields[i].getGenericType();
                        if (genericType instanceof ParameterizedType) {

                        	String simpleName = ( (Class) ((ParameterizedType) genericType).getActualTypeArguments()[0]).getSimpleName();                       	
                        	Joint joint=new Joint(len++,j+1,seek(simpleName));
                        	joint.opt.attrs.stroke="red";
                            Associations.add(joint);
                        }
                    } 
                    else if (annotation.annotationType().equals(ManyToOne.class)) {
                    	String simpleName =  fields[i].getType().getSimpleName();
                        Joint joint=new Joint(len++,j+1,seek(simpleName));
                    	joint.opt.attrs.stroke="orange";
                    	Associations.add(joint);
                    }
                }
            
            	
            
            }
    	}
        models.addAll(Associations);
    }
    
    
    
    
    public int seek(String val)
    {
    	for(int i=0; i<models.size(); i++)
    	{
    		Model m=(Model)models.get(i);
    		if(m.label.equals(val))
    			return m.euid;
    	}
    	return -1;
    }
    
    
}

