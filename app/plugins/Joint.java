package plugins;

import java.util.ArrayList;
import java.util.Map;

import plugins.classes.LabelAttrs;
import java.util.List;
import com.thoughtworks.xstream.alias.ClassMapper.Null;

public class Joint {

	String object;
	int euid;
	
	public class Opt
	{
		public class Vertices{
			int x;
			int y;
			public Vertices(int x,int y)
			{
				this.x=x;
				this.y=y;
			}
		}
		List<Vertices> vertices=new ArrayList<Vertices>();
		
		public class Attrs{
			String stroke;
			int fill_4p_opacity;
			int stroke_4p_width;
			String stroke_4p_dasharray;
			String stroke_4p_linecap;
			String stroke_4p_linejoin;
			int stroke_4p_miterlimit;
			int stroke_4p_opacity;			
		};
		Attrs attrs=new Attrs();
		String cursor;
		boolean beSmooth;
		boolean interactive;
		public class LabelAttrsDefault
		{
			double position;
			int offset;
			int font_4p_size;
			String fill;
		};
		LabelAttrsDefault labelAttrsDefault=new LabelAttrsDefault();
		List<String> labelAttrs=new ArrayList<String>();
		public class Handle{
			int timeout;
			public class se{
				boolean enabled;
				int radius;
			}
		se start=new se();
		se end=new se();

		}
		Handle handle=new Handle();
		public class Arrow{
			public class se{
			    List<String> path=new ArrayList<String>();
				int dx;
				int dy;
				public class Attrs{
					int opacity;
				}
				Attrs attrs=new Attrs();
			}
			se start=new se();
			se end=new se();
				
		}
		Arrow arrow=new Arrow();
		
		}
	Opt opt=new Opt();
	int from;
	int to;
	public class Registered{
		List <Integer>start=new ArrayList<Integer>();
		List <Integer>end=new ArrayList<Integer>();
		List <Integer>both=new ArrayList<Integer>();
	}
	Registered registered=new Registered();
	
	public Joint(int id,int from,int to)
	{
		this.euid=id;
		this.from=from;
		this.to=to;
		
		intializeDefaults();
		
	}
	
	
	public void intializeDefaults()
	{
		this.object="joint";
		
		this.opt.attrs.stroke="blue";
		this.opt.attrs.fill_4p_opacity=0;
		this.opt.attrs.stroke_4p_width=1;
		this.opt.attrs.stroke_4p_dasharray="none";
		this.opt.attrs.stroke_4p_linecap="round";
		this.opt.attrs.stroke_4p_linejoin="round";
		this.opt.attrs.stroke_4p_miterlimit=1;
		this.opt.attrs.stroke_4p_opacity=1;
		
		this.opt.cursor="default";
		this.opt.beSmooth=true;
		this.opt.interactive=true;
		
		this.opt.labelAttrsDefault.position=0.5;
		this.opt.labelAttrsDefault.offset=0;
		this.opt.labelAttrsDefault.font_4p_size=12;
		this.opt.labelAttrsDefault.fill="#000";
		
		this.opt.handle.timeout=2000;
		this.opt.handle.start.enabled=false;
		this.opt.handle.start.radius=4;
		this.opt.handle.end.enabled=false;
		this.opt.handle.end.radius=4;
		
		this.opt.arrow.start.path.add("M");
		this.opt.arrow.start.path.add("2");
		this.opt.arrow.start.path.add("0");
		this.opt.arrow.start.path.add("L");
		this.opt.arrow.start.path.add("-2");
		this.opt.arrow.start.path.add("0");
		
		this.opt.arrow.start.dx=1;
		this.opt.arrow.start.dy=1;
		this.opt.arrow.start.attrs.opacity=1;
		
		this.opt.arrow.end.path.add("M");
		this.opt.arrow.end.path.add("4");
		this.opt.arrow.end.path.add("0");
		this.opt.arrow.end.path.add("L");
		this.opt.arrow.end.path.add("-4");
		this.opt.arrow.end.path.add("-4");
		this.opt.arrow.end.path.add("L");
		this.opt.arrow.end.path.add("-4");
		this.opt.arrow.end.path.add("4");
		this.opt.arrow.end.path.add("z");
		
		this.opt.arrow.end.dx=2;
		this.opt.arrow.end.dy=2;
		this.opt.arrow.end.attrs.opacity=1;
		this.registered.both.add(this.from);
		this.registered.both.add(this.to);
		
	}
	
	
	
}
