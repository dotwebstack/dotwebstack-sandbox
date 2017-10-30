package org.dotwebstack.sandbox.dotwebstacksandbox;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import org.dotwebstack.framework.backend.ResultType;
import org.dotwebstack.framework.frontend.http.provider.SparqlProvider;
import org.eclipse.rdf4j.model.Model;
import org.eclipse.rdf4j.query.GraphQueryResult;
import org.eclipse.rdf4j.query.QueryResults;
import org.eclipse.rdf4j.rio.RDFFormat;
import org.eclipse.rdf4j.rio.Rio;
import org.springframework.stereotype.Service;

@Service
@SparqlProvider(resultType = ResultType.GRAPH)
@Produces({MediaType.TEXT_HTML})
public class HtmlGraphMessageBodyWriter implements MessageBodyWriter<GraphQueryResult> {

  @Override
  public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations,
                             MediaType mediaType) {
    return GraphQueryResult.class.isAssignableFrom(type)
        && MediaType.TEXT_HTML_TYPE.equals(mediaType);
  }

  @Override
  public long getSize(GraphQueryResult model, Class<?> type, Type genericType,
                      Annotation[] annotations, MediaType mediaType) {
    // deprecated by JAX-RS 2.0 and ignored by Jersey runtime
    return -1;
  }

  @Override
  public void writeTo(GraphQueryResult queryResult, Class<?> type, Type genericType,
                      Annotation[] annotations, MediaType mediaType,
                      MultivaluedMap<String, Object> multivaluedMap, OutputStream outputStream)
      throws IOException {
    Model model = QueryResults.asModel(queryResult);

    Writer writer = new PrintWriter(outputStream);
    writer.write("<html>");
    writer.write("<head>");
    writer.write("<title>Basisregistraties Adressen en Gebouwen</title>");
    writer.write("<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">");
    writer.write("<script id=\"graph\" type=\"application/ld+json\">");
    Rio.write(model, writer, RDFFormat.JSONLD);
    writer.write("</script>");
    writer.write("</head>");
    writer.write("<body>");
    writer.write("<div class=\"container\">");
    writer.write("<h1>Model</h1>");
    writer.write("<div id=\"root\">Loading...</div>");
    writer.write("</div>");
    writer.write("<script crossorigin src=\"http://localhost:8081/assets/js/app.js\"></script>");
    writer.write("</body>");
    writer.write("</html>");
    writer.flush();
    writer.close();
  }

}
